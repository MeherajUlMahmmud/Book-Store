const express = require('express');
const bodyParser = require("body-parser");
const database = require("./database");
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Routes
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const bookRoutes = require("./routes/book.route");
const authorRoutes = require("./routes/author.route");
const reviewRoutes = require("./routes/review.route");
const bookBorrowRoutes = require("./routes/bookBorrow.route");
const bookReserveRoutes = require("./routes/bookReserve.route");

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => res.send('Hello world'));
app.use('/graphql', graphqlHTTP({
	schema: buildSchema(`
		type RootQuery {
			events: [String!]!
		}
		type RootMutation {
			createEvent(name: String): String
		}
		schema {
			query: RootQuery,
			mutation: RootMutation
		}
	`),
	rootValue: {
		events: () => {
			return ['Romantic Cooking', 'Sailing', 'All-Night Coding'];
		},
		createEvent: (args) => {
			const eventName = args.name;
			return eventName;
		}
	},
	graphiql: true,
}));
// app.use("/api/auth", authRoutes);
// app.use("/api", userRoutes);
// app.use("/api", bookRoutes);
// app.use("/api", authorRoutes);
// app.use("/api", reviewRoutes);
// app.use("/api", bookBorrowRoutes);
// app.use("/api", bookReserveRoutes);

app.listen(PORT, () => `Server is running on port ${PORT}`);
