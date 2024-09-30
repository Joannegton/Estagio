let db = {
    profiles: [
        {
            id: 1,
            name: "Admin",
            permissions: ["estoque", "manutencao", "todas"]
        },
        {
            id: 2,
            name: "User",
            permissions: ["estoque"]
        }
    ]
};

function getProfiles() {
    return db.profiles;
}

function addProfile(profile) {
    profile.id = db.profiles.length ? db.profiles[db.profiles.length - 1].id + 1 : 1;
    db.profiles.push(profile);
}

function updateProfile(id, updatedProfile) {
    const index = db.profiles.findIndex(profile => profile.id === id);
    if (index !== -1) {
        db.profiles[index] = { ...db.profiles[index], ...updatedProfile };
    }
}

function deleteProfile(id) {
    db.profiles = db.profiles.filter(profile => profile.id !== id);
}