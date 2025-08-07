import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    useEffect(() => {
        api.get('/transactions')
            .then(res => setTransactions(res.data))
            .catch(() => setErr('Не вдалося отримати транзакції'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
    if (err) return <Alert variant="danger">{err}</Alert>;

    return (
        <Container>
            <h2>Транзакції</h2>
            <Table striped bordered>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Сума</th>
                    <th>Тип</th>
                    <th>Account ID</th>
                    <th>Source ID</th>
                    <th>Створено</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map(t => (
                    <tr key={t.id}>
                        <td>{t.id}</td>
                        <td>{t.amount}</td>
                        <td>{t.direction}</td>
                        <td>{t.account_id}</td>
                        <td>{t.source_id}</td>
                        <td>{new Date(t.created_at).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}