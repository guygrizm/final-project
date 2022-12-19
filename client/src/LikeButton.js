const [items, setItems] = useState([]);

useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
        setItems(items);
    }
}, []);
