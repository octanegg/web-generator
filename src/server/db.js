const low = require("lowdb");
const uuid = require("uuid");

const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ users: [{ username: "admin", password: "ilovedexzy", templates: [] }], templates: [] }).write();

export function getAllTemplates() {
    return db.get("templates").value();
}

export function getAllUsers() {
    return db.get("users").value();
}

export function getUserTemplates(username) {
    const userTemplates = db.get("users").find({ username }).value().templates;
    return db.get("templates").filter(_ => userTemplates.some(templateId => templateId === _)).value();
}

/**
 *Add a template to the database.
 *
 * @export
 * @param {"match" | "topPerformers"} type
 * @param {string} photo
 * @param {string} org
 * @param {string} tableColor
 * @param {string} textColor
 * @param {string} orgPhoto
 * @param {string[]} columnOrder
 */
export function addTemplate(type, name, photo, org, tableColor, textColor, orgPhoto, columnOrder) {
    const uniqueId = uuid.v4();

    db.get("templates").push({ id: uniqueId, name, type, photo, org, tableColor, textColor, orgPhoto, columnOrder }).write();
    db.get("users").find({ username: "admin" }).get("templates").push(uniqueId).write();
}

export function addUser(username, password) {
    db.get("users").push({ id: uuid.v4(), username, password, templates: [] }).write();
}

export function authenticateUser(username, password) {
    return db.get("users").find({ username, password }).size().value() > 0;
}