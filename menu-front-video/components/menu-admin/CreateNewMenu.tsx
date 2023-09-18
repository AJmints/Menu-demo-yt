'use client'

import { useState } from "react";

interface Menu {
    id: Number, 
    lastUpdated: String,
    menuItemIds: Number[],
    name: String,
}

export default function CreateNewMenu(props: any) {

    const webUrl: string = 'http://localhost:8080'

    const selectedValues: any[] = [];
    const [updateMenu, setUpdateMenu] = useState<string[]>([]);

    const handleSubmit = async(event: any) => {
        event.preventDefault()

        const data = {
            name: String(event.target.name.value),
            items: (updateMenu),
        }

        await fetch(webUrl + '/admin/createMenu', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then(response => response.json()).then((data: Menu[]) => {
            props.setCurrentMenu(data[data.length - 1])
            event.target.name.value = ""
            setUpdateMenu([])
        })
    }

    const handleSelection = (event: any) => {
        event.preventDefault()
        if (event.target.value != "") {
            setUpdateMenu([...updateMenu, event.target.value])
        }

    }

    const menuItems = props.menuItems.sort(function(a: any, b: any) {
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0;
    }).map((item: any) => {
        return <option key={item.id} value={item.name}>{item.name}</option>
    });

    const itemsCurrentlyBeingAdded = updateMenu.map((item: string) => {
        return (
            <li key={item}>{"-" + item}</li>
        )
    })

    return (
        <div className="flex">
            <div className="bg-gray-300  mx-2 p-3 rounded-md">
            <form onSubmit={handleSubmit}>
                <h1>Create new menu</h1>

                <div>
                    <h1>New Menu Name:</h1>
                    <input type="text" id="name" required minLength={3} maxLength={30} />
                </div>
                <div className="mt-4">
                    <h1>Add Items:</h1>
                    <select multiple={true} value={selectedValues} onChange={handleSelection} id="addItem">
                        {menuItems}
                    </select>
                </div>

                <button type="submit" className="bg-green-500/80 p-2 m-2 rounded-md">Submit</button>
            </form>
            </div>

            <div className="bg-gray-400 mx-2 p-3 rounded-md">
                <h1>Items currently on the list</h1>
                <ol>
                    {itemsCurrentlyBeingAdded}
                </ol>
                {updateMenu.length !== 0 && <button className="bg-red-500/80 p-2 rounded-md mt-3" onClick={() => setUpdateMenu([])}>Clear List</button>}
            </div>
        </div>
    )
}
