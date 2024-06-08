import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import './App.css';

const App = () => {
    const [folders, setFolders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [newFolderName, setNewFolderName] = useState('');
    const itemsPerPage = 9;

    useEffect(() => {
        const savedFolders = JSON.parse(localStorage.getItem('folders')) || [];
        setFolders(savedFolders);
    }, []);

    useEffect(() => {
        localStorage.setItem('folders', JSON.stringify(folders));
    }, [folders]);

    const createFolder = () => {
        if (newFolderName) {
            setFolders([...folders, newFolderName]);
            setNewFolderName('');
        }
    };

    const deleteFolder = (folderName) => {
        setFolders(folders.filter(folder => folder !== folderName));
    };

    const displayedFolders = folders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Container className="app-container">
            <div className="header">WordSmart</div>
            <div className="main-card">
                <Row>
                    <Col>
                        <Row className="mb-3">
                            {displayedFolders.map((folderName, index) => (
                                <Col key={index} xs={4} className="mb-3">
                                    <div className="folder border p-2 text-center" onClick={() => window.location.href = `/words?folder=${folderName}`}>
                                        <span>{folderName}</span>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                        <Row className="justify-content-center">
                            <InputGroup className="mb-3" style={{ maxWidth: '400px' }}>
                                <FormControl
                                    placeholder="Имя папки для удаления"
                                    aria-label="Имя папки для удаления"
                                    id="delete-folder-name"
                                />
                                <Button variant="danger" onClick={() => deleteFolder(document.getElementById('delete-folder-name').value)}>Удалить папку</Button>
                            </InputGroup>
                        </Row>
                        <Row className="justify-content-center">
                            <InputGroup className="mb-3" style={{ maxWidth: '400px' }}>
                                <FormControl
                                    placeholder="Имя новой папки"
                                    aria-label="Имя новой папки"
                                    value={newFolderName}
                                    onChange={(e) => setNewFolderName(e.target.value)}
                                />
                                <Button variant="success" onClick={createFolder}>Создать новую папку</Button>
                            </InputGroup>
                        </Row>
                        <Row className="navigation-buttons">
                            <Button className="button-small" variant="success" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>←</Button>
                            <Button className="button-small" variant="success" onClick={() => setCurrentPage(currentPage * itemsPerPage < folders.length ? currentPage + 1 : currentPage)}>→</Button>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default App;
