import fs from "fs/promises";
import * as path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
}

export async function getContactById(contactId) {
  const list = await listContacts();
  const contact = list?.find((contact) => contact.id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const list = await listContacts();
  const newList = list.filter((contact) => contact.id !== contactId);
  const deleteContact =
    list?.find((contact) => contact.id === contactId) || null;
  updatedListContacts(newList);
  return deleteContact;
}

export async function addContact(name, email, phone) {
  const list = await listContacts();
  if (list?.find((contact) => contact.name === name))
    return `Contact ${name} is already in the Contacts`;
  const newContact = { id: nanoid(), name, email, phone };
  list.push(newContact);
  updatedListContacts(list);
  return newContact;
}

function updatedListContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
