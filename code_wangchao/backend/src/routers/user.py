from flask import Blueprint
from controller import user_controller 

router_user = Blueprint('user', __name__)

router_user.route('/register', methods=['POST'])(user_controller.register)
