'use client'

interface MenuItem {
    id: number,
    name: string,
    price: number,
    description: string,
    category: string,
    new: boolean,
}

export default function MenuItemForm(props: any) {

    const webUrl: string = "http://localhost:8080"

    const handleSubmit = async(event: any) => {
        event.preventDefault();
        
        const data = {
            name: String(event.target.name.value),
            description: String(event.target.description.value),
            category: String(event.target.category.value),
            price: Number(event.target.price.value),
            isNew: Boolean(event.target.isNew.checked),
        }

        await fetch(webUrl + "/admin/addMenuItem", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then((response) => response.json()).then((data: MenuItem[]) => {
            props.setMenuItems(data);

            event.target.name.value = ""
            event.target.description.value = ""
            event.target.category.value = ""
            event.target.price.value = ""
        })
    }

    return (
        <div className="flex justify-center bg-gray-400 mx-2 p-3 rounded-md">
            <form onSubmit={handleSubmit}>
                <h1>Create New Menu Item</h1>
                <div>
                    <h1>Name: </h1>
                    <input type="text" autoComplete="off" id="name" required minLength={3} maxLength={40} />
                </div>

                <div>
                    <h1>Description: </h1>
                    <input type="text" autoComplete="off" id="description" required minLength={3} maxLength={40} />
                </div>

                <div>
                    <h1>Category: </h1>
                    <select defaultValue="default" id="category">
                        <option value="default" disabled>Select meal type</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Drinks">Drinks</option>
                    </select> 
                </div>

                <div>
                    <h1>Price: </h1>
                    <input type="text" autoComplete="off" id="price" />
                </div>

                <div>
                    <h1>Is it new?:</h1>
                    <input type="checkbox" id="isNew" />
                </div>

                <button className="bg-green-500/80 p-2 rounded-md" type="submit">Submit</button>
            </form>
        </div>
    )
}