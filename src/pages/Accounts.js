import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';

export default function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    useEffect(() => {
        api.get('/accounts')
            .then(res => setAccounts(res.data))
            .catch(() => setErr('Не вдалося отримати акаунти'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
    if (err) return <Alert variant="danger">{err}</Alert>;

    return (
        <Container>
            <h2>Акаунти</h2>
            <Table striped bordered>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Баланс</th>
                    <th>Валюта</th>
                    <th>Номер</th>
                    <th>Статус</th>
                    <th>Створено</th>
                </tr>
                </thead>
                <tbody>
                {accounts.map(acc => (
                    <tr key={acc.id}>
                        <td>{acc.id}</td>
                        <td>{acc.balance}</td>
                        <td>{acc.currency}</td>
                        <td>{acc.number}</td>
                        <td>{acc.status}</td>
                        <td>{new Date(acc.created_at).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}