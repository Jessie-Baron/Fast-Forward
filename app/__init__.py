import os
from flask import Flask, request, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_login import LoginManager
from .models import db, User
from .api.follower_routes import followers_routes
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.fast_forward_routes import fast_forward_routes
from .api.comment_routes import comments_routes
from .seeds import seed_commands
from .config import Config


app = Flask(__name__, static_folder="../react-app/build", static_url_path="/")

# Setup login manager
login = LoginManager(app)
login.login_view = "auth.unauthorized"


@login.user_loader
def load_user(id):
    print("Load User is running")
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)

app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(fast_forward_routes, url_prefix='/api/fast_forward/')
app.register_blueprint(followers_routes, url_prefix="/api/followers")
app.register_blueprint(comments_routes, url_prefix="/api/comments")

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get("FLASK_ENV") == "production":
        if request.headers.get("X-Forwarded-Proto") == "http":
            url = request.url.replace("http://", "https://", 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        "csrf_token",
        generate_csrf(),
        secure=True if os.environ.get("FLASK_ENV") == "production" else False,
        samesite="Strict" if os.environ.get("FLASK_ENV") == "production" else None,
        httponly=True,
    )
    return response




@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    route_list = {
        rule.rule: [
            [method for method in rule.methods if method in acceptable_methods],
            app.view_functions[rule.endpoint].__doc__,
        ]
        for rule in app.url_map.iter_rules()
        if rule.endpoint != "static"
    }
    return route_list

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == "favicon.ico":
        return app.send_from_directory("public", "favicon.ico")
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
