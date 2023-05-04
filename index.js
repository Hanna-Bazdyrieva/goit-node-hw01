const {	listContacts,
	getContactById,
	removeContact,
	addContact,
} = require("./contacts");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const contactsList = await listContacts();
			console.table(contactsList);
			break;

		case "get":
			const contact = await getContactById(id);
			if (!contact) {
				console.warn(`\x1B[31m Contact with id=${id} not found`);

				throw new Error(`Contact with id=${id} not found`);
			}
			console.log(contact);
			break;

		case "add":
			const newContact = await addContact({ name, email, phone });
			console.log(newContact);
						break;

		case "remove":
			const removedContact = await removeContact(id);
			if (!removedContact) {
				console.warn(`\x1B[31m Contact with id=${id} not found`);
			}
			console.log(removedContact);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);


