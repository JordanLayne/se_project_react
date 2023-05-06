import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import {
  getClothing,
  addClothing,
  deleteCard,
  addLike,
  removeLike,
  editProfile,
} from "../utils/api";
import { getWeather, filterData } from "../utils/WeatherApi";
import Header from "./Header/Header";
import Main from "./Main/Main";
import * as auth from "../auth";
import Footer from "./Footer/Footer";
import AddItemModal from "./AddItemModal/AddItemModal";

import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import ItemModal from "./ItemModal/ItemModal";
import PopupWithConfirmation from "./ModalConfirmation/ModalConfirmation";
import Profile from "./Profile/Profile";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditModal from "./EditModal/EditModal";
import LogoutModal from "./LogoutModal/LogoutModal";
function App() {
  const [activeModal, setActiveModal] = useState("");

  const [weatherData, setWeatherData] = useState({});

  const [selectedCard, setSelectedCard] = useState(null);

  const [clothingCards, setClothingCards] = useState([]);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = React.useState({});
  const [value, setValue] = useState(false);
  const [token, setToken] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();

  const handleCreateModal = () => setActiveModal("create");

  const handleDeleteClick = () => setActiveModal("confirm");
  const handleLogoutClick = () => {
    setActiveModal("logout");
  };
  const handleEditClick = () => {
    setActiveModal("edit");
  };
  const handleLoginModal = () => setActiveModal("login");
  const handleRegisterModal = () => setActiveModal("register");
  const handleClosePopup = () => setActiveModal("");

  const handleToggleSwitchChange = () => {
    setValue(!value);

    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCancel = () => setActiveModal("preview");

  const handleSelectedCard = (card) => {
    setActiveModal("preview");

    setSelectedCard(card);
  };

  const handleOutClick = (evt) => {
    if (evt.target === evt.currentTarget) setActiveModal();
  };

  const handleLogin = (email, pw) => {
    auth
      .authenticateUser(email, pw)
      .then((data) => {
        if (data.token) {
          auth
            .checkToken(data.token)
            .then((res) => {
              return res;
            })
            .then((data) => {
              setCurrentUser(data);
            })
            .then(() => {
              setIsLoggedIn(true);
            })
            .then(() => {
              history.push("http://localhost:3001/profile");
            })
            .catch((err) => console.log(err));
        }
      })
      .then(() => {
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  };
  const handleRegister = (email, password, name, avatar) => {
    auth
      .registerUser(email, password, name, avatar)
      .then((res) => {
        console.log(res ? true : false);
        if (res) {
          setCurrentUser(res);
        } else {
          console.log("Something went wrong.");
        }
      })
      .then(() => {
        handleLogin(email, password);
      })
      .then(() => {
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  };

  const handleAddSubmit = (rawCard, token) => {
    setIsLoading(true);

    addClothing(rawCard, token)
      .then((data) => {
        const card = rawCard;
        card._id = data.data._id;
        card.owner = currentUser.data._id;
        card.likes = data.data.likes;
        setClothingCards([...clothingCards, card]);
      })
      .then(() => {
        handleClosePopup();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    handleClosePopup();
    setCurrentUser({});
    localStorage.removeItem("jwt");
  };
  const handleEditSubmit = ({ name, avatarUrl }) => {
    setIsLoading(true);

    editProfile({ name, avatarUrl }, token)
      .then(() => {
        setCurrentUser({
          data: {
            ...currentUser.data,
            name: name,
            avatar: avatarUrl,
          },
        });
        handleClosePopup();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (id) => {
    setIsLoading(true);

    deleteCard(id, token)
      .then(() => {
        setClothingCards(
          clothingCards.filter((card) => {
            if (card._id === id) {
              return false;
            }
            return true;
          })
        );
        handleClosePopup();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLike = (id, isLiked, user) => {
    isLiked
      ? removeLike(id, user, token)
          .then((updatedCard) => {
            setClothingCards((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch((err) => console.log(err))
      : addLike(id, user, token)
          .then((updatedCard) => {
            setClothingCards((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather()
      .then((data) => setWeatherData(filterData(data)))

      .catch((error) => console.error("Error fetching weather data:", error));
  }, []);

  useEffect(() => {
    getClothing()
      .then((data) => {
        setClothingCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        handleClosePopup();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      setToken(jwt);

      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
          return res;
        })
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);
  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange, value }}
        >
          <Header
            weatherData={weatherData}
            onCreateModal={handleCreateModal}
            onChange={handleToggleSwitchChange}
            checked={value}
            onLoginModal={handleLoginModal}
            isLoggedIn={isLoggedIn}
            onRegisterModal={handleRegisterModal}
          />

          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Main
                  weatherData={weatherData}
                  cards={clothingCards}
                  onCardClick={handleSelectedCard}
                  isDay={true}
                  isLoggedIn={isLoggedIn}
                  onLike={handleLike}
                />
              )}
            />

            <Route
              exact
              path="/profile"
              render={() => {
                if (!isLoggedIn) {
                  return <Redirect to="/" />;
                }
                return (
                  <Profile
                    weatherData={weatherData}
                    onCardClick={handleSelectedCard}
                    cards={clothingCards}
                    onCreateModal={handleCreateModal}
                    isLoggedIn={isLoggedIn}
                    onLike={handleLike}
                    editClick={handleEditClick}
                    handleLogout={handleLogoutClick}
                  />
                );
              }}
            />
          </Switch>

          <Footer />

          {activeModal === "create" && (
            <AddItemModal
              handleClosePopup={handleClosePopup}
              onAddItem={handleAddSubmit}
              token={token}
            />
          )}

          {activeModal === "preview" && (
            <ItemModal
              handleClosePopup={handleClosePopup}
              card={selectedCard}
              onDeleteClick={handleDeleteClick}
              isLoggedIn={isLoggedIn}
            />
          )}

          {activeModal === "confirm" && (
            <PopupWithConfirmation
              onClose={handleClosePopup}
              onOutClick={handleOutClick}
              onCancel={handleCancel}
              onDelete={handleDelete}
              card={selectedCard}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              handleClosePopup={handleClosePopup}
              handleLogin={handleLogin}
              onRegisterModal={handleRegisterModal}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              handleClosePopup={handleClosePopup}
              handleRegister={handleRegister}
              onLoginModal={handleLoginModal}
            />
          )}
          {activeModal === "edit" && (
            <EditModal
              handleClosePopup={handleClosePopup}
              handleEdit={handleEditSubmit}
            />
          )}
          {activeModal === "logout" && (
            <LogoutModal
              handleClosePopup={handleClosePopup}
              handleLogout={handleLogout}
              onCancel={handleCancel}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
