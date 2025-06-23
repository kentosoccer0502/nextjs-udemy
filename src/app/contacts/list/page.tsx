import { getContact, getContacts} from "@/lib/contact"

type Contact = {
  id: string;
  name: string;
  email: string;
};

export default async function ListPage() {
    const contacts: Contact[] = await getContacts()
    const first: Contact | null = await getContact('1')
  return (
    <div>
      複数
      <ul>
        {contacts.map((contact: Contact) => (
            <li key={contact.id}>
                {contact.name} : {contact.email} 
            </li>
        ) )}
      </ul>
      1件
      <div>{ first ? first.name : '登録されていません' }</div>
    </div>
  )
}
