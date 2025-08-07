import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    useEffect(() => {
        api.get('/users')
            .then(res => setUsers(res.data))
            .catch(() => setErr('Не вдалося отримати користувачів'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
    if (err) return <Alert variant="danger">{err}</Alert>;

    return (
        <Container>
            <h2>Користувачі</h2>
            <Table striped bordered>
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Ім’я</th>
                    <th>Прізвище</th>
                    <th>Роль</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u.id}>
                        <td>{u.email}</td>
                        <td>{u.first_name}</td>
                        <td>{u.last_name}</td>
                        <td>{u.role}</td>
                        <td>{u.status}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}