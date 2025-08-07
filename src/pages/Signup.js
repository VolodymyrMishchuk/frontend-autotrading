import React, { useState } from 'react';
import api from '../api/api';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        birth_date: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api.post('/auth/signup', form);
            setMessage('Перевірте email для підтвердження!');
            setError('');
            setTimeout(() => navigate('/login'), 2500);
        } catch (err) {
            setError('Помилка при реєстрації. Спробуйте ще.');
        }
    }

    return (
        <Card style={{ maxWidth: 500, margin: 'auto', marginTop: '6%' }}>
            <Card.Body>
                <Card.Title>Реєстрація</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label>Ім’я</Form.Label>
                        <Form.Control name="first_name" required value={form.first_name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Прізвище</Form.Label>
                        <Form.Control name="last_name" required value={form.last_name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" required value={form.email} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control name="phone_number" required value={form.phone_number} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Дата народження</Form.Label>
                        <Form.Control type="date" name="birth_date" required value={form.birth_date} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" name="password" required minLength={8} value={form.password} onChange={handleChange} />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100">Зареєструватись</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}