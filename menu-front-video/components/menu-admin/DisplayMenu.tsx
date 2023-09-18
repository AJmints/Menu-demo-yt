import DisplayMenuItems from "./DisplayMenuItems";

interface Menu {
    id: Number, 
    lastUpdated: String,
    menuItemIds: Number[],
    name: String,
}

export default function DisplayMenu(props: any) {

    const webUrl: string = 'http://localhost:8080'
    let dropDownSelect: string;

    const handleSubmit = (event: any) => {
        event.preventDefault()

        if (props.allMenus.find((menu: Menu) => menu.name === dropDownSelect) !== undefined) {
            props.setCurrentMenu(props.allMenus.find((menu: Menu) => menu.name === dropDownSelect))
        }
    }

    const removeMenu = (itemId: number) => {

        fetch(webUrl + "/admin/removeMenu/" + itemId, {
            method: "DELETE",
        }).then(response => response.json()).then((data: Menu[]) => {
            props.setAllMenus(data)
            props.setCurrentMenu(data[data.length - 1])
        })
        
    }

    const dropDownAllMenus = props.allMenus.map((item: any) => {
        return (
            <option key={item.id} value={item.name}>{item.name}</option>
        )
    })

    return (
        <div className="bg-gray-100 p-4 mx-2 rounded-md">

            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Select and view other menu</h1>
                    <select defaultValue="default" onChange={(event) => dropDownSelect = event.target.value} id="menu">
                        <option value="default" disabled>Select Menu</option>
                        {dropDownAllMenus}
                    </select>
                    <button type="submit" className="bg-green-500/80 mx-2 px-2 rounded-md">Submit</button>
                </form>
            </div>


            <h1 className="mt-4 text-xl">Current Menu: {props.currentMenu?.name}</h1>
            <h1>Menu Created: {props.currentMenu?.lastUpdated}</h1>

            <DisplayMenuItems 
            menuItems={props.menuItems}
            currentMenu={props.currentMenu}
            />

            <br/>
            <button onClick={() => removeMenu(props.currentMenu?.id)} className="p-2 bg-red-500/80 rounded-md">Delete Current Menu</button>
        </div>
    )
}