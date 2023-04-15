import { useState } from "react"

export const usePhoneBookList = () => {
    const [phoneBookList, setPhoneBookList] = useState([{id: 0, name: 'Angelica', lastname: 'Ocampo', phone: '3166179047'}]);

    return {phoneBookList, setPhoneBookList};
}