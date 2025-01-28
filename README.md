# Basic Messaging Application
MERN stack web app that lets user send and receive messages and reply to them as desired.

## Features 
1. A web application that allows users to create, read, update, and delete user account information. 
2. Any registered user is able to send/view message to other user with reply functionality.
3. Replies are displayed under the original message.
4. User can see messages where the user is either the sender or receiver.
5. See online/offline status* (To be added)

## Tech Requirement
The application is built using the MongoDB(mongoose), Express, Reactjs, Node.js and Tailwind CSS(v4.0).
### Environment Variables 
**Frontend**  
`VITE_API_URL = http://localhost:5000`

**Backend**  
```
MONGO_URI = 'mongodb://localhost:27017/messaging_app'
JWT_SECRET = 'yoursecretkey'
PORT = 5000
```

## DEMO Snapshots 
1. User Management:  
    List users, edit user details, and delete users.
![image](https://github.com/user-attachments/assets/1468274a-bc0c-4454-9d17-5401e9f125e1)

2. Messaging:  
Display messages and allow users to send/reply.
![image](https://github.com/user-attachments/assets/f773cdb3-1708-41f8-8ebb-b84d46a40cd8)

3. Edit  
   The user can modify the required field.
![image](https://github.com/user-attachments/assets/a072bb4c-69d3-49ec-80e8-f3e726567cd0)

5. Registration Form:  
Fields: name, email, phone number, role, password.
![image](https://github.com/user-attachments/assets/49e51826-3020-4888-83de-811d6265509f)

6. Login Form:  
Save JWT in localStorage.
![image](https://github.com/user-attachments/assets/24ea472f-4aa0-454f-99c1-5cd862f19200)
