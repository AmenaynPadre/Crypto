export const query = (url) =>{
    const array = url.slice(1).split('&');
    return array.reduce((acc,current) =>{
        const [key, value] = current.split('=');
        acc[key] = value;
        return acc    
    },{})
}