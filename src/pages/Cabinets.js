import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';

export default function Cabinets() {
    const [cabinets, setCabinets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    useEffect(() => {
        api.get('/cabinets')
            .then(res => setCabinets(res.data))
            .catch(() => setErr('Не вдалося отримати кабінети'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
    if (err) return <Alert variant="danger">{err}</Alert>;

    return (
        <Container>
            <h2>Трейдинг-кабінети</h2>
            <Table striped bordered>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Назва</th>
                    <th>Статус</th>
                    <th>User ID</th>
                    <th>Account ID</th>
                    <th>MetaTrade Token</th>
                </tr>
                </thead>
                <tbody>
                {cabinets.map(c => (
                    <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.name}</td>
                        <td>{c.status}</td>
                        <td>{c.user_id}</td>
                        <td>{c.account_id}</td>
                        <td>{c.meta_trade_token}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}