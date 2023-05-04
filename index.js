const {
	contactsPath,
	listContacts,
	getContactById,
	removeContact,
	addContact,
} = require("./contacts");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const contactsList = await listContacts();
			console.table(contactsList)
			// console.log(contactsList[0])
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
			const newContact = await addContact({name, email, phone});
			console.log(newContact);
			break;

		case "remove":
			const removedContact = await removeContact(id);
			if (!removedContact) {
				console.warn(`\x1B[31m Contact with id=${id} not found`);
			}
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}
invokeAction(argv);


// invokeAction({ action: 'list'})

// const id = "rsKkOQUi80UsgVPCcLZZW";
// invokeAction({ action: "get", id });

// const newContact = {
// 	name: "Alec Boldwin",
// 	email: "elementum@scelerisques.net",
// 	phone: "(748) 206-2688",
// };

// invokeAction({ action: "add", data: newContact });
// const id = "646a899c-3b51-4cb0-90e7-7523858d3d44";
// invokeAction({ action: "remove", id });
//
