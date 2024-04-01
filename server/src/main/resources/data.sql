insert into workspace(workspace_id, name, code, business_title_id) values
(2002, 'Some', 'FMcNw2', 5),
(2003, 'Shipra Bakes', 'FMcNw3', 4),
(2004, 'BrainStand', 'FMcNw4', 3);

insert into users(user_id, email, name, password, role, bio, is_enable, workspace_id) values
(1001, 'nihalislam2@gmail.com', 'Nihal Islam', '$2a$10$T16zWLV3ZfFKiwMw8y/9POiRhIXPCOhtujhCegTeXkg2rBGyM5H9O', 'USER', 'Im a web dev student', true, null),
(1002, 'nihal.islam@g.bracu.ac.bd', 'Nihal', '$2a$10$T16zWLV3ZfFKiwMw8y/9POiRhIXPCOhtujhCegTeXkg2rBGyM5H9O', 'ADMIN', 'Im a Student', true, 2004),
(1003, 'shsakin2002@gmail.com', 'Sakin', '$2a$10$T16zWLV3ZfFKiwMw8y/9POiRhIXPCOhtujhCegTeXkg2rBGyM5H9O', 'ADMIN', 'Im a DBA', true, 2002),
(1004, 'shahrin.sultana@g.bracu.ac.bd', 'Shahrin Sultana', '$2a$10$T16zWLV3ZfFKiwMw8y/9POiRhIXPCOhtujhCegTeXkg2rBGyM5H9O', 'ADMIN', 'I cook sometimes', true, 2003);

update workspace set user_id = 1003 where workspace_id = 2002;
update workspace set user_id = 1004 where workspace_id = 2003;
update workspace set user_id = 1002 where workspace_id = 2004;

insert into user_join_workspace(user_join_workspace_id, user_id, workspace_id, post_id) values(4001, 1003, 2003, null),
(4002, 1002, 2003, null), (4003, 1001, 2004, null), (4004, 1003, 2004, null), (4005, 1004, 2004, null);

insert into post_add_workspace(workspace_id, post_id) values(2002, 17), (2002, 18), (2002, 19), (2002, 20), (2003, 13), (2003, 14), (2003, 15), (2003, 16), (2004, 9), (2004, 10), (2004, 11), (2004, 12);

insert into team(team_id, name, workspace_id) values
(5001, 'Web Dev', 2004),
(5002, 'iOS Dev', 2004),
(5003, 'Bake', 2003);

insert into product(product_id, name, workspace_id) values
(6001, 'Web Application', 2004),
(6002, 'iOS Application', 2004),
(6003, 'Android Application', 2004),
(6004, 'Cupcake', 2003),
(6005, 'Pound Cake', 2003),
(6006, 'Pasta', 2003);