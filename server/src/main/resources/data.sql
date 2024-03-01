insert into workspace(workspace_id, name, code, business_title_id) values(2001, 'Food Bear', 'FMcNw1', 4),
(2002, 'IKAE', 'M96kw2', 2);
insert into users(user_id, email, name, password, role, is_enable, workspace_id) values(1001, 'nihalislam2@gmail.com', 'Nihal Islam', '$2a$10$T16zWLV3ZfFKiwMw8y/9POiRhIXPCOhtujhCegTeXkg2rBGyM5H9O', 'ADMIN', true, 2001),
(1002, 'nihal.islam@g.bracu.ac.bd', 'Nihal', '$2a$10$T16zWLV3ZfFKiwMw8y/9POiRhIXPCOhtujhCegTeXkg2rBGyM5H9O', 'USER', true, null),
(1003, 'nihalislam1122@gmail.com', 'Nihal', '$2a$10$T16zWLV3ZfFKiwMw8y/9POiRhIXPCOhtujhCegTeXkg2rBGyM5H9O', 'ADMIN', true, 2002);
insert into notification(notification_id, user_id, description, is_invitation) values(3001, 1001, 'Your very own workspace Food Bear has been created', false),
(3002, 1003, 'Your very own workspace IKAE has been created', false);