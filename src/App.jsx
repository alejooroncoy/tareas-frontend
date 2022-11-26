import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container, Button, Form } from "react-bootstrap";

const App = () => {
  const [tareas, setTareas] = useState([]);
  const [infoTarea, setInfoTarea] = useState({
    descripcion: "",
    estado: "pendiente",
  });
  const handleChangeDescription = (e) => {
    setInfoTarea({
      ...infoTarea,
      descripcion: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataTarea = {
      descripcion: infoTarea.descripcion,
      estado: infoTarea.estado,
    };
    // registro de nueva tarea
    const { data } = await axios.post(
      "https://tareas-backend.onrender.com//tarea",
      dataTarea
    );
    setTareas([...tareas, data.content]);
  };
  const eliminar = async (id) => {
    await axios.delete(`https://tareas-backend.onrender.com//tarea/${id}`);
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const getTareas = async () => {
    const { data } = await axios.get(
      "https://tareas-backend.onrender.com//tarea"
    );
    setTareas(data.content);
  };
  useEffect(() => {
    getTareas();
  }, []);
  return (
    <main>
      <section className="py-4">
        <Container>
          <h2 className="mb-3">Lista de Tareas</h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Tarea</th>
                <th>Estado</th>
                <th>...</th>
              </tr>
            </thead>
            <tbody>
              {tareas.map((tarea) => (
                <tr key={tarea.id}>
                  <td>{tarea.id}</td>
                  <td>{tarea.descripcion}</td>
                  <td>{tarea.estado}</td>
                  <td>
                    <Button variant="danger" onClick={() => eliminar(tarea.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </section>
      <section>
        <Container>
          <h2 className="mb-3">Agregar Tarea</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={infoTarea.descripcion}
                onChange={handleChangeDescription}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Container>
      </section>
    </main>
  );
};

export default App;
