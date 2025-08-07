import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';

export default function Sources() {
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    useEffect(() => {
        api.get('/sources')
            .then(res => setSources(res.data))
            .catch(() => setErr('Не вдалося отримати джерела'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
    if (err) return <Alert variant="danger">{err}</Alert>;

    return (
        <Container>
            <h2>Джерела сигналів</h2>
            <Table striped bordered>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Назва</th>
                    <th>Платформа</th>
                    <th>Статус</th>
                    <th>Створено</th>
                </tr>
                </thead>
                <tbody>
                {sources.map(s => (
                    <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.name}</td>
                        <td>{s.platform}</td>
                        <td>{s.status}</td>
                        <td>{new Date(s.created_at).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}