import api from "../api/connectionAxios";

class DatosBD {

  // Obtener userId desde localStorage
  getUserId() {
    return localStorage.getItem('userId');
  }


  //--------------------------- PERSONAS -----------------------------


  //peticion para traer a los users
  async getDatos() {
    return await api.get("/persona/buscar");
  }

  //metodo ´para crear
  async postDatos(data) {
    return await api.post("/persona/create", data);
  }

  //Metodo para elminar
  async deletePersona(id) {
    return await api.delete(`/persona/eliminar/${id}`);
  }

  //metodo para actualizar
  async updatePersona(id, data) {
    return await api.put(`/persona/modificar/${id}`, data);
  }


  // ------------------------- LIBROS ------------------------------

  //trae catalago completo
  async getLibros() {
    const response = await api.get("/libros");
    return response.data;
  }

  //trae los datos por id
  async getLibroPorId(id) {
    const response = await api.get(`/libros/${id}`);
    return response.data;
  }

  //para crear libro
  async createLibro(data) {
    const response = await api.post("/libros/create", data);
    return response.data;
  }

  //para actualizar
  async actualizarLibro(id, data) {
    const response = await api.put(`/libros/${id}`, data);
    return response.data;
  }

  //para eliminar
  async eliminarLibro(id) {
    const response = await api.delete(`/libros/${id}`);
    return response.data;
  }

  // ----------------------- AUTENTICACIÓN ---------------

  //manda credenciales y res con los datos del user
  async login(credentials) {
    const response = await api.post("/login", credentials);
    return response.data;
  }


  // ── IMÁGENES ──

  //subir imagen del libro y devuelve el url
  async subirImagen(file) {
    const formData = new FormData();
    formData.append("imagen", file);
    const response = await api.post("/libros/upload", formData);
    return response.data.url;
  }

  //subir una imagen de usuario  
  async subirAvatar(idUsuario, file) {
    const formData = new FormData();
    formData.append('imagen', file);
    const response = await api.post(`/persona/avatar/${idUsuario}`, formData);
    return response.data;
  }

  //PRESTAR 

  //prestar libro
  async crearPrestamo(data) {
    const response = await api.post("/prestamos", data);
    return response.data;
  }

  //cargar los prestamos dependiendo el id de user 
  async misPrestamos(usuarioId) {
    const response = await api.get(`/prestamos/mis-prestamos/${usuarioId}`);
    return response.data;
  }

  //para devolver los libros con fecha
  async devolverLibro(prestamoId) {
    const response = await api.put(`/prestamos/devolver/${prestamoId}`);
    return response.data;
  }

  //obtener todos los prestamos 
  async getAllPrestamos() {
    const response = await api.get("/prestamos/admin");
    return response.data;
  }

}
export default new DatosBD();
