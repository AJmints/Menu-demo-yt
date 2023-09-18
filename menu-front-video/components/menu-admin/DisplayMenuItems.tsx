interface Menu {
    id: Number, 
    lastUpdated: String,
    menuItemIds: Number[],
    name: String,
}

export default function DisplayMenuItems(props: any) {

    const appItems = props.currentMenu?.menuItemIds.map((menuItemIds: number) => {
        if (props.menuItems.find((item: Menu) => item.id === menuItemIds) !== undefined) {
            let category = props.menuItems.find((item: Menu) => item.id === menuItemIds) 
            return (
                <p key={category.id}>{category.category === "Appetizer" ? category.name : ""}</p>
            )
        }
    })

    const breakfastItems = props.currentMenu?.menuItemIds.map((menuItemIds: number) => {
        if (props.menuItems.find((item: Menu) => item.id === menuItemIds) !== undefined) {
            let category = props.menuItems.find((item: Menu) => item.id === menuItemIds) 
            return (
                <p key={category.id}>{category.category === "Breakfast" ? category.name : ""}</p>
            )
        }
    })

    const lunchItems = props.currentMenu?.menuItemIds.map((menuItemIds: number) => {
        if (props.menuItems.find((item: Menu) => item.id === menuItemIds) !== undefined) {
            let category = props.menuItems.find((item: Menu) => item.id === menuItemIds) 
            return (
                <p key={category.id}>{category.category === "Lunch" ? category.name : ""}</p>
            )
        }
    })

    const dinnerItems = props.currentMenu?.menuItemIds.map((menuItemIds: number) => {
        if (props.menuItems.find((item: Menu) => item.id === menuItemIds) !== undefined) {
            let category = props.menuItems.find((item: Menu) => item.id === menuItemIds) 
            return (
                <p key={category.id}>{category.category === "Dinner" ? category.name : ""}</p>
            )
        }
    })

    const dessertItems = props.currentMenu?.menuItemIds.map((menuItemIds: number) => {
        if (props.menuItems.find((item: Menu) => item.id === menuItemIds) !== undefined) {
            let category = props.menuItems.find((item: Menu) => item.id === menuItemIds) 
            return (
                <p key={category.id}>{category.category === "Dessert" ? category.name : ""}</p>
            )
        }
    })

    const drinkItems = props.currentMenu?.menuItemIds.map((menuItemIds: number) => {
        if (props.menuItems.find((item: Menu) => item.id === menuItemIds) !== undefined) {
            let category = props.menuItems.find((item: Menu) => item.id === menuItemIds) 
            return (
                <p key={category.id}>{category.category === "Drinks" ? category.name : ""}</p>
            )
        }
    })

    return (
        <div className="mt-4 flex space-x-3">

            <div>
                <h1 className="text-xl">Appetizers</h1>
                <ol>
                    {appItems}
                </ol>
            </div>

            <div>
                <h1 className="text-xl">Breakfast</h1>
                <ol>
                    {breakfastItems}
                </ol>
            </div>

            <div>
                <h1 className="text-xl">Lunch</h1>
                <ol>
                    {lunchItems}
                </ol>
            </div>

            <div>
                <h1 className="text-xl">Dinner</h1>
                <ol>
                    {dinnerItems}
                </ol>
            </div>

            <div>
                <h1 className="text-xl">Dessert</h1>
                <ol>
                    {dessertItems}
                </ol>
            </div>

            <div>
                <h1 className="text-xl">Drinks</h1>
                <ol>
                    {drinkItems}
                </ol>
            </div>


        </div>
    )
}