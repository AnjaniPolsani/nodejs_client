import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, editUser, deleteUser, showUsers } from './appointmentSlice';

function UserTable() {
    const users = useSelector(showUsers);
    const dispatch = useDispatch();

    // load users only once
    useEffect(() => {
        fetch('http://192.168.56.101:3001/api/users')
            .then(response => response.json())
            .then(data => dispatch(getUsers(data)));
    }, [dispatch]);

    return (
        <section className="main-content">
            <div className="container">
                <br />
                <br />

                <table className="table">
                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Status</th>
                            <th>Appointment</th>
                            <th>Phone</th>
                            <th>Doctor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="user-info">
                                        <div className="user-info__img">
                                            <img src="img/prof.png" alt="User Img" />
                                        </div>
                                        <div className="user-info__basic">
                                            <h5 className="mb-0">{user.name}</h5>
                                            <p className="text-muted mb-0">{user.age} yrs, {user.gender}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={user.status === 'Consult' ? 'btn btn-success' : 'btn btn-primary'}>{user.status}</span>
                                </td>
                                <td>
                                    <h6 className="mb-0">{user.time}</h6>
                                    <small>{user.date}</small>
                                </td>
                                <td>
                                    <h6 className="mb-0">{user.phone}</h6>
                                    <a href="#!"><small>Contact</small></a>
                                </td>
                                <td>
                                    <h6 className="mb-0">{user.doctor}</h6>
                                </td>
                                <td>
                                    <div className="dropdown open">
                                        <a href="#!" className="px-2" id="triggerId1" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <i className="fa fa-ellipsis-v"></i>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="triggerId1">
                                            <a className="dropdown-item" href="#" onClick={() => dispatch(editUser({index, id: user.id}))}><i className="fa fa-pencil mr-1"></i> Edit</a>
                                            <a className="dropdown-item text-danger" href="#" onClick={() => dispatch(deleteUser({index, id: user.id}))}><i className="fa fa-trash mr-1"></i>
                                                Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default UserTable;
