//Déclarations des variables 

// Variables login, logout & mode edition
const userToken = sessionStorage.getItem("token");
const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
const hiddenElements = document.querySelectorAll(".hidden");

// Variables pour les modales :
const modalContainer = document.querySelectorAll(".modal-container");
const triggerButtons = document.querySelectorAll(".modal-trigger");
const deleteWorksModal = document.querySelector(".delete-works-modal");
const addWorksModal = document.querySelector(".add-works-modal");
const allowedExtensions = ["jpg", ".jpeg", ".png"];
const maxFileSize = 4 * 1024 * 1024; //4Mo