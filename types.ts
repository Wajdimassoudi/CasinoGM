
export interface Game {
    id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    game_url: string;
    genre: string;
    platform: string;
    publisher: string;
    developer: string;
    release_date: string;
    freetogame_profile_url: string;
  }
  
  export interface Giveaway {
    id: number;
    title: string;
    worth: string;
    thumbnail: string;
    image: string;
    description: string;
    instructions: string;
    open_giveaway_url: string;
    published_date: string;
    type: string;
    platforms: string;
    end_date: string;
    users: number;
    status: string;
    gamerpower_url: string;
    open_giveaway: string;
  }
