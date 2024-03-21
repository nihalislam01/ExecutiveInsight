insert into workspace(workspace_id, name, code, business_title_id) values(2001, 'Food Bear', 'FMcNw1', 4),
(2002, 'BrainStand', 'FMcNw2', 3);

insert into users(user_id, email, name, password, role, bio, is_enable, workspace_id) values(1001, 'nihalislam2@gmail.com', 'Nihal Islam', '$2a$10$T16zWLV3ZfFKiwMw8y/9POiRhIXPCOhtujhCegTeXkg2rBGyM5H9O', 'ADMIN', 'Im a web dev student', true, 2001),

(1002, 'nihal.islam@g.bracu.ac.bd', 'Nihal', '$2a$10$T16zWLV3ZfFKiwMw8y/9POiRhIXPCOhtujhCegTeXkg2rBGyM5H9O', 'USER', 'Im a Student', true, null),
(1003, 'shsakin2002@gmail.com', 'Sakin', '$2a$10$T16zWLV3ZfFKiwMw8y/9POiRhIXPCOhtujhCegTeXkg2rBGyM5H9O', 'ADMIN', 'Im a DBA', true, 2002),
(1004, 'shahrin.sultana@g.bracu.ac.bd', 'Shahrin Sultana', '$2a$10$T16zWLV3ZfFKiwMw8y/9POiRhIXPCOhtujhCegTeXkg2rBGyM5H9O', 'USER', 'Im a Student', true, null);

update workspace set user_id = 1001 where workspace_id = 2001;
update workspace set user_id = 1002 where workspace_id = 2002;

insert into user_join_workspace(user_join_workspace_id, user_id, workspace_id, post_id) values(4002, 1002, 2001, 5);

insert into notification(notification_id, user_id, description, is_invitation) values(3001, 1001, 'Your very own workspace Food Bear has been created', false),
(3002, 1002, 'Your very own workspace BrainStand has been created 1', false),
(3003, 1001, 'Your very own workspace Food Bear has been created 2', false);