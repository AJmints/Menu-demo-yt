'use client'

import MenuItemCard from "./MenuItemCard"

interface MenuItem {
    id: number,
    name: string,
    price: number,
    description: string,
    category: string,
    new: boolean,
}

export default function MenuItemEditDisplay(props: any) {

    const webUrl: string = 'http://localhost:8080'

    const removeItem = (itemId: number) => {
        fetch(webUrl + '/admin/removeItem/' + itemId, {
            method: "DELETE"
        }).then((response) => response.json()).then((data: MenuItem[]) => {
            props.setMenuItems(data);
        })
    }

    const allItems = props.menuItems.sort((a: any,b: any) => {
        return a.id - b.id
    }).map((item: MenuItem) => {
        return (
            <MenuItemCard
            key={item.id}
            item={item}
            removeItem={removeItem}
            setMenuItems={props.setMenuItems}
            />
        )
    })

    return (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
        {allItems}
        </div>
    )
}