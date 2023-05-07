const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function updateContacts(contacts) {
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
}

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath);
		const list = JSON.parse(data);
		return list;
	} catch (error) {
		console.log(error);
	}
}

async function getContactById(contactId) {
	try {
		const contacts = await listContacts();
		const result = contacts.find((item) => item.id === contactId) || null;
		return result;
	} catch (error) {
		console.log(error);
	}
}

async function removeContact(contactId) {
	try {
		const contacts = await listContacts();
		const index = contacts.findIndex((item) => item.id === contactId);
		if (index === -1) {
			return null;
		}
		const removedContact = contacts.splice(index, 1);
		updateContacts(contacts);
		return removedContact;
	} catch (error) {
		console.log(error);
	}
}

async function addContact(data) {
	try {
		const contacts = await listContacts();
		const newContact = { ...data, id: v4() };
		contacts.push(newContact);
		updateContacts(contacts);
		return newContact;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	contactsPath,
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
