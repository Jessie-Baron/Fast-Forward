from flask import Blueprint, request
from app.models import db, fast_forward, user
from flask_login import current_user, login_required
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

clip_routes = Blueprint("clips", __name__)


@clip_routes.route("", methods=["POST"])
@login_required
def upload_clip():
    if "clip" not in request.files:
        return {"errors": "clip required"}, 400

    clip = request.files["clip"]

    if not allowed_file(clip.filename):
        return {"errors": "file type not permitted"}, 400

    clip.filename = get_unique_filename(clip.filename)

    upload = upload_file_to_s3(clip)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_clip = clip(user=current_user, url=url)
    db.session.add(new_clip)
    db.session.commit()
    return {"url": url}
