const normal = 'https://traineeapp.azurewebsites.net/api';

export const getAllCustomers = async () => {
    const response = await fetch(`${normal}/customers`)
    return response.json();
}

export const getAllTrainings = async () => {
    const response = await fetch(`${normal}/trainings`)
    return response.json();
}