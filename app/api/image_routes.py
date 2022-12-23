from flask import Blueprint, request
from app.models import db, fast_forward, user
from flask_login import current_user, login_required
from app.aws2 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("images", __name__)


@image_routes.route('', methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]
    print(image, "this is the image")

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    print(upload, "this is the upload")

    return upload
