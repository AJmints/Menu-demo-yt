'use client'

import CreateNewMenu from "@/components/menu-admin/CreateNewMenu";
import DisplayMenu from "@/components/menu-admin/DisplayMenu";
import MenuItemEditDisplay from "@/components/menu-admin/MenuItemEditDisplay";
import MenuItemForm from "@/components/menu-admin/MenuItemForm";
import { useState, useEffect } from 'react';

interface MenuItem {
    id: number,
    name: string,
    price: number,
    description: string,
    category: string,
    new: boolean,
}

interface Menu {
    id: Number, 
    lastUpdated: String,
    menuItemIds: Number[],
    name: String,
}

export default function MenuAdmin() {

    const webUrl: string = 'http://localhost:8080'

    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [allMenus, setAllMenus] = useState<Menu[]>([]);
    const [currentMenu, setCurrentMenu] = useState<Menu>()

    useEffect(function() {
        const getMenuItems = async() => {
            await fetch(webUrl + '/admin/getMenuItems')
            .then(response => response.json())
            .then(data => {
                setMenuItems(data)
            })
        }
        const getMenu = async() => {
            await fetch(webUrl + "/admin/getMenus")
            .then(response => response.json())
            .then(data => {
                setAllMenus(data)
                setCurrentMenu(data[data.length - 1])
            })
        }
        getMenu()
        getMenuItems()
    }, [])

    return (
        <div>
        <p className="font-light text-2xl text-center my-5">This is the admin page</p>
        
        <div className="mb-3">
            <DisplayMenu 
            menuItems={menuItems}
            allMenus={allMenus}
            currentMenu={currentMenu}
            setCurrentMenu={setCurrentMenu}
            setAllMenus={setAllMenus}
            />
        </div>

        <div className="flex">
        <MenuItemForm
        setMenuItems={setMenuItems}
        />
        <CreateNewMenu 
        menuItems={menuItems}
        setCurrentMenu={setCurrentMenu}
        />
        </div>

        <div>
            <MenuItemEditDisplay
            menuItems={menuItems}
            setMenuItems={setMenuItems}
            />
        </div>
        
        </div>
    )
}