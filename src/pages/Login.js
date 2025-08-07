import React, { useState } from 'react';
import api from '../api/api';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('access_token', res.data.access_token);
            navigate('/');
        } catch (err) {
            setError('Невірний email або пароль');
        }
    }

    return (
        <Card style={{ maxWidth: 400, margin: 'auto', marginTop: '8%' }}>
            <Card.Body>
                <Card.Title>Вхід</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100">Увійти</Button>
                </Form>
                <div className="mt-3 text-center">
                    <a href="/signup">Реєстрація</a>
                </div>
            </Card.Body>
        </Card>
    );
}