import fs from "fs/promises";
import * as path from "path";
import { nanoid } from "nanoid";

// const fs = require("fs/promises");
const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
}

async function getContactById(contactId) {
  const list = await listContacts();
  const contact = list?.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const list = await listContacts();
  const newList = list?.filter((contact) => contact.id !== contactId);
  const deleteContact =
    list?.find((contact) => contact.id === contactId) || null;
  updatedListContacts(newList);
  return deleteContact;
}

async function addContact(name, email, phone) {
  const newContact = { id: nanoid(), name, email, phone };
  const list = await listContacts();
  const newContactList = list?.push(newContact);
  updatedListContacts(newContactList);
  return newContact;
}

function updatedListContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
