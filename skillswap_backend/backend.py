from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import copy

app = Flask(__name__)
CORS(app)

INITIAL_TEACHERS = [
  { 'id': 't1', 'email': 'e.reed@example.com', 'phone': '555-111-1111', 'role': 'teacher', 'name': 'Dr. Evelyn Reed', 'interests': ['Mathematics', 'Physics', 'Computer Science', 'Web Development'], 'rating': 4.8, 'bio': 'Passionate about making complex topics understandable.', 'connections': [] },
  { 'id': 't2', 'email': 'd.lee@example.com', 'phone': '555-222-2222', 'role': 'teacher', 'name': 'Mr. David Lee', 'interests': ['History', 'Literature', 'Creative Writing'], 'rating': 4.5, 'bio': 'Exploring the stories that shape our world.', 'connections': [] },
  { 'id': 't3', 'email': 's.chen@example.com', 'phone': '555-333-3333', 'role': 'teacher', 'name': 'Ms. Sarah Chen', 'interests': ['Art', 'Music', 'Graphic Design'], 'rating': 4.9, 'bio': 'Inspiring creativity through visual arts and music.', 'connections': [] },
  { 'id': 't4', 'email': 'b.carter@example.com', 'phone': '555-444-4444', 'role': 'teacher', 'name': 'Mr. Ben Carter', 'interests': ['Language Learning', 'Geography'], 'rating': 4.6, 'bio': 'Helping students connect with different cultures.', 'connections': [] },
  { 'id': 't5', 'email': 'o.white@example.com', 'phone': '555-555-5555', 'role': 'teacher', 'name': 'Ms. Olivia White', 'interests': ['Yoga', 'Physical Education', 'Biology'], 'rating': 4.7, 'bio': 'Promoting wellness and a healthy lifestyle.', 'connections': [] },
]

users = copy.deepcopy(INITIAL_TEACHERS)
next_user_id_counter = 1

@app.route('/api/login', methods=['POST'])
def login():
    global next_user_id_counter
    data = request.get_json()

    if not data:
        return jsonify({"message": "Request body must be JSON"}), 400

    email = data.get('email')
    role = data.get('role')
    name = data.get('name')
    interests = data.get('interests')

    if not all([name, email, role, interests]) or not isinstance(interests, list) or len(interests) == 0:
        return jsonify({"message": "Missing required login fields (name, email, role, interests)."}), 400

    user = None
    timestamp = int(time.time() * 1000)

    if role == 'student':
        user = {
            'id': f's_{timestamp}_{next_user_id_counter}',
            'email': email,
            'role': 'student',
            'name': name,
            'interests': interests or [],
            'connections': [],
            'bio': '',
        }
        print(f"Student logged in/signed up: {user['id']} {user['name']}")
        next_user_id_counter += 1
    elif role == 'teacher':
        existing_teacher = next((u for u in users if u.get('email') == email and u.get('role') == 'teacher'), None)
        if existing_teacher:
            print(f"Existing teacher logged in: {existing_teacher['id']} {existing_teacher['name']}")
            return jsonify(existing_teacher)

        user = {
            'id': f't_{timestamp}_{next_user_id_counter}',
            'email': email,
            'role': 'teacher',
            'name': name,
            'interests': interests or [],
            'bio': '',
            'connections': [],
            'phone': '',
            'rating': None,
        }
        print(f"New teacher logged in/signed up: {user['id']} {user['name']}")
        next_user_id_counter += 1
    else:
        return jsonify({"message": "Invalid role specified."}), 400

    if not any(u['id'] == user['id'] for u in users):
        users.append(user)

    return jsonify(user)

@app.route('/api/teachers', methods=['GET'])
def get_teachers():
    print("Fetching teachers list...")
    teacher_list = [user for user in users if user.get('role') == 'teacher']
    return jsonify(teacher_list)

@app.route('/api/users/<string:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((u for u in users if u.get('id') == user_id), None)

    if user:
        print(f"Fetching user data for: {user_id}")
        return jsonify(user)
    else:
        return jsonify({"message": "User not found"}), 404

@app.route('/api/users/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    if not data:
        return jsonify({"message": "Request body must be JSON"}), 400

    user_index = -1
    for i, u in enumerate(users):
        if u.get('id') == user_id:
            user_index = i
            break

    if user_index == -1:
        return jsonify({"message": "User not found"}), 404

    user_to_update = users[user_index]
    updated = False

    if 'bio' in data:
        user_to_update['bio'] = data['bio']
        print(f"Updated bio for user {user_id}")
        updated = True

    if 'connectTeacherId' in data and user_to_update.get('role') == 'student':
        teacher_id_to_connect = data['connectTeacherId']
        teacher_exists = any(u.get('id') == teacher_id_to_connect and u.get('role') == 'teacher' for u in users)

        if teacher_exists:
            if teacher_id_to_connect not in user_to_update.get('connections', []):
                if 'connections' not in user_to_update:
                    user_to_update['connections'] = []
                user_to_update['connections'].append(teacher_id_to_connect)
                print(f"User {user_id} connected with teacher {teacher_id_to_connect}")
                updated = True
            else:
                 print(f"User {user_id} already connected with teacher {teacher_id_to_connect}")
        else:
            print(f"Attempted connection to non-existent teacher {teacher_id_to_connect} by user {user_id}")

    if updated:
        users[user_index] = user_to_update
        return jsonify(user_to_update)
    else:
        return jsonify(user_to_update)

if __name__ == '__main__':
    app.run(port=3001, debug=True)
