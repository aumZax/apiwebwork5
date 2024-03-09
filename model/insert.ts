export interface PersonXXX {
    person_id:   number;
    name:      string;
    personal:  string;
    img_person:       string;
    birthdate: string;

}

export interface MoiveXXX {

    movie_id:  number;
    title:    string;
    plot:      string;
    img_movie: string;
    rating:    number;
    genre:     string;
}

export interface CreatorsXXX {

    creators_id: number;
    movie_id:    number;
    person_id:   number;
    type:        string;
    name:        string;
}

export interface StarsXXX {

    stars_id:  number;
    person_id: number;
    movie_id:  number;
    type:      string;
}

