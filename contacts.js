const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const readContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};
const writeContacts = async (data) => {
  try {
    const result = await fs.writeFile(
      contactsPath,
      JSON.stringify(data, null, 2)
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

async function listContacts() {
  const listContacts = await readContacts();
  return listContacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const findedContact = contacts.find((contact) => contact.id === contactId);
  if (!findedContact) {
    return null;
  }
  return findedContact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const findedIdx = contacts.findIndex((contact) => contact.id === contactId);
  if (findedIdx === -1) {
    return null;
  }
  const deletedContact = contacts.splice(findedIdx, 1);
  await writeContacts(contacts);
  return deletedContact;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
