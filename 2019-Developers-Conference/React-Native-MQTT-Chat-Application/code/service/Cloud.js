/**
 * AUTHOR: VIDUSH H. NAMAH
 */

export const GetSessions = () => {
    return fetch("https://sessionize.com/api/v2/rn3ak6vi/view/Sessions")
        .then((response) => response.json())
        .then((data) => {
            SESSIONS = [];

            data.forEach(element => {
                sessions = element.sessions;
                sessions.forEach(item => SESSIONS.push({
                    Id: item.id,
                    Title: item.title,
                    Description: item.description,
                    Start: item.startsAt,
                    End: item.endsAt,
                    Room: item.room
                }));
            });

            return SESSIONS;
        })
        .catch((error) => console.log("[FETCH] Error: " + error));
}