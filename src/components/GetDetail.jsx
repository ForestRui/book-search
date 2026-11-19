async function GetDetail (workKey) {
 const response = await fetch(`https://openlibrary.org${workKey}.json`);
 if (!response.ok) {
    console.error('cant get detail');
 }
 return response.json();
}

export default GetDetail;