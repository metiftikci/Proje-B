export class Settings {
    static API_HOST = "192.168.1.8";
    static API_PORT = "37001";
}

export default class Database {
    async teachers() {
        const response = await fetch(`http://${Settings.API_HOST}:${Settings.API_PORT}/api/teacher`);

        if (response.ok) {
            const json = await response.json();

            return json;
        }

        return null;
    }

    async raspberries() {
        const response = await fetch(`http://${Settings.API_HOST}:${Settings.API_PORT}/api/raspberry`);

        if (response.ok) {
            const json = await response.json();

            return json;
        }

        return null;
    }

    async updateRaspberry(raspberryId, status) {
        const url = `http://${Settings.API_HOST}:${Settings.API_PORT}/api/raspberry/${raspberryId}/status/${status}`;

        const response = await fetch(url, { method: 'PUT' });

        if (response.ok) {
            return status;
        }

        return null;
    }
}
