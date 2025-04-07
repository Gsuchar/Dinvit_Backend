import mongoose, { Schema, Document } from 'mongoose';

export interface IInvitation extends Document {
  _id: mongoose.Types.ObjectId;
  uniqueLink: string;

  invitationDetails: {
    title: string;
    celebrated: string;
    date: Date;
    time: string;
    location: {
      name: string;
      address: string;
      city: string;
      country: string;
    };
    dressCode?: string;
    notes?: string;
    music?: string;
    language: 'es' | 'en' | 'pt';
  };

  images?: string[];

  rsvp?: {
    name: string;
    email: string;
    guests: number;
    allergies?: string;
    suggestions?: string;
  };

  musicSuggestions?: {
    enabled: boolean;
    list: {
      name: string;
      suggestion: string;
      link?: string;
      createdAt: Date;
    }[];
  };
}

const InvitationSchema: Schema = new Schema(
  {
    uniqueLink: { type: String, required: true, unique: true },

    invitationDetails: {
      title: { type: String, required: true },
      celebrated: { type: String, required: true },
      date: { type: Date, required: true },
      time: { type: String, required: true },
      location: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true }
      },
      dressCode: { type: String },
      notes: { type: String },
      music: { type: String },
      language: {
        type: String,
        enum: ['es', 'en', 'pt'],
        default: 'es'
      }
    },

    images: [{ type: String }],

    rsvp: {
      name: { type: String },
      email: { type: String },
      guests: { type: Number },
      allergies: { type: String },
      suggestions: { type: String }
    },

    musicSuggestions: {
      enabled: { type: Boolean, default: false },
      list: [
        {
          name: { type: String, required: true },
          suggestion: { type: String, required: true },
          link: { type: String },
          createdAt: { type: Date, default: Date.now }
        }
      ]
    }
  },
  { timestamps: true }
);

export default mongoose.model<IInvitation>('Invitation', InvitationSchema);






/*import mongoose, { Schema, Document } from 'mongoose';

export interface IInvitation extends Document {
  event: mongoose.Types.ObjectId;
  title: string;
  honoree: string;
  uniqueLink: string;

  eventDetails: {
    date: Date;
    time: string;
    location: {
      name: string;
      address: string;
      city: string;
      country: string;
    };
    dressCode?: string;
    notes?: string;
  };

  appearance: {
    music?: string;
    images?: string[];
    language: 'es' | 'en' | 'pt';
  };

  rsvp?: {
    name: string;
    email: string;
    guests: number;
    allergies?: string;
    suggestions?: string;
  };

  musicSuggestions?: {
    enabled: boolean;
    list: {
      name: string;
      suggestion: string;
      link?: string;
      createdAt: Date;
    }[];
  };
}

const InvitationSchema: Schema = new Schema(
  {
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },

    title: { type: String, required: true },
    honoree: { type: String, required: true },
    uniqueLink: { type: String, required: true, unique: true },

    eventDetails: {
      date: { type: Date, required: true },
      time: { type: String, required: true },
      location: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true }
      },
      dressCode: { type: String },
      notes: { type: String }
    },

    appearance: {
      music: { type: String },
      images: [{ type: String }],
      language: {
        type: String,
        enum: ['es', 'en', 'pt'],
        default: 'es'
      }
    },

    rsvp: {
      name: { type: String },
      email: { type: String },
      guests: { type: Number },
      allergies: { type: String },
      suggestions: { type: String }
    },

    musicSuggestions: {
      enabled: { type: Boolean, default: false },
      list: [
        {
          name: { type: String, required: true },
          suggestion: { type: String, required: true },
          link: { type: String },
          createdAt: { type: Date, default: Date.now }
        }
      ]
    }
  },
  { timestamps: true }
);

export default mongoose.model<IInvitation>('Invitation', InvitationSchema);*/









/*import mongoose, { Schema, Document } from 'mongoose';

export interface IInvitation extends Document {
  event: mongoose.Types.ObjectId;
  title: string;
  honoree: string;
  date: Date;
  time: string;
  location: string;
  dressCode?: string;
  agenda?: string;
  uniqueLink: string;
  music?: string;
  images?: string[];
  language: 'es' | 'en' | 'pt';
  rsvp?: {
    name: string;
    email: string;
    guests: number;
    allergies?: string;
    suggestions?: string;
  };
}

const InvitationSchema: Schema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  title: { type: String, required: true },
  honoree: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  dressCode: { type: String },
  agenda: { type: String },
  uniqueLink: { type: String, required: true, unique: true },
  music: { type: String },
  images: [{ type: String }],
  language: { type: String, enum: ['es', 'en', 'pt'], default: 'es' },
  rsvp: {
    name: { type: String },
    email: { type: String },
    guests: { type: Number },
    allergies: { type: String },
    suggestions: { type: String }
  }
}, { timestamps: true });

export default mongoose.model<IInvitation>('Invitation', InvitationSchema);*/
