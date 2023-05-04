const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function updateContacts(contacts) {
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
}

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	const list = JSON.parse(data);
	return list;
}

async function getContactById(contactId) {
	const contacts = await listContacts();
	const result = contacts.find((item) => item.id === contactId) || null;
	return result;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	const removedContact = contacts.splice(index, 1);
	updateContacts(contacts);
	return removedContact;
}

async function addContact(data) {
	const contacts = await listContacts();
	const newContact = { ...data, id: v4() };
	contacts.push(newContact);
	updateContacts(contacts);
	return newContact;
}

module.exports = {
	contactsPath,
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
