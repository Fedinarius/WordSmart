import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Table, FormControl } from 'react-bootstrap';
import './App.css';

const Words = () => {
    const [words, setWords] = useState([]);
    const [showCards, setShowCards] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showDefinition, setShowDefinition] = useState(false);
    const [shuffledWords, setShuffledWords] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const folderName = new URLSearchParams(location.search).get('folder');

    useEffect(() => {
        const savedWords = JSON.parse(localStorage.getItem(folderName)) || [];
        setWords(savedWords);
        setShuffledWords(savedWords.sort(() => 0.5 - Math.random()));
    }, [folderName]);

    useEffect(() => {
        localStorage.setItem(folderName, JSON.stringify(words));
    }, [words, folderName]);

    const addWord = () => {
        const word = document.getElementById('new-word').value;
        const definition = document.getElementById('new-definition').value;
        if (word && definition) {
            const newWords = [...words, { word, definition }];
            setWords(newWords);
            setShuffledWords(newWords.sort(() => 0.5 - Math.random()));
            document.getElementById('new-word').value = '';
            document.getElementById('new-definition').value = '';
        }
    };

    const deleteWord = (index) => {
        const newWords = words.filter((_, i) => i !== index);
        setWords(newWords);
        setShuffledWords(newWords.sort(() => 0.5 - Math.random()));
    };

    const startReview = () => {
        if (words.length > 0) {
            setShowCards(true);
            setCurrentCardIndex(0);
            setShowDefinition(false);
            setShuffledWords(words.sort(() => 0.5 - Math.random()));
        }
    };

    const nextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % shuffledWords.length);
        setShowDefinition(false);
    };

    const previousCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + shuffledWords.length) % shuffledWords.length);
        setShowDefinition(false);
    };

    if (showCards) {
        const currentWord = shuffledWords[currentCardIndex];
        return (
            <Container className="app-container position-relative">
                <div className="card-container">
                    <h1>{showDefinition ? currentWord.definition : currentWord.word}</h1>
                    <div className="card-buttons">
                        <Button className="button-small" variant="success" onClick={previousCard}>Предыдущая карточка</Button>
                        <Button className="button-small" variant="success" onClick={() => setShowDefinition(!showDefinition)}>Посмотреть перевод</Button>
                        <Button className="button-small" variant="success" onClick={nextCard}>Следующая карточка</Button>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container className="app-container position-relative">
            <div className="words-container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>{folderName}</h1>
                    <Button className="button-small" variant="success" onClick={() => navigate('/')}>Выйти из папки</Button>
                </div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Слово</th>
                            <th>Определение</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {words.map((word, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{word.word}</td>
                                <td>{word.definition}</td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteWord(index)}>Удалить</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Row className="mt-3">
                    <Col xs={4}>
                        <FormControl placeholder="Новое слово" id="new-word" />
                    </Col>
                    <Col xs={4}>
                        <FormControl placeholder="Определение" id="new-definition" />
                    </Col>
                    <Col xs={4}>
                        <Button variant="success" onClick={addWord}>Добавить</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Button className="button-small" variant="success" onClick={startReview} disabled={words.length === 0}>Начать повторение</Button>
                </Row>
            </div>
        </Container>
    );
};

export default Words;
