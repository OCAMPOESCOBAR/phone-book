import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { usePhoneBookList } from "./hooks/usePhoneBookList";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(true);
  const [name, setName] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [errors, setErrors] = React.useState({
    name: { isInvalid: false, msg: "" },
    lastname: { isInvalid: false, msg: "" },
    phone: { isInvalid: false, msg: "" },
  });
  const { phoneBookList, setPhoneBookList } = usePhoneBookList();
  const [phoneBookListFilter, setPhoneBookListFilter] =
    React.useState(phoneBookList);

  React.useEffect(() => {
    if (search !== "") {
      const list = [...phoneBookList];
      const listFilter = list.filter((i) => {
        if (
          i.name.toLowerCase().includes(search) ||
          i.lastname.toLowerCase().includes(search) ||
          i.phone.toLowerCase().includes(search)
        ) {
          return i;
        }
      });
      setPhoneBookListFilter(listFilter);
    } else {
      const list = [...phoneBookList];
      setPhoneBookListFilter(list);
    }
  }, [search]);

  const onChangeSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onChangeName = (e) => {
    setErrors({
      ...errors,
      name: { isInvalid: false, msg: "" },
    });
    setName(e.target.value);
  };

  const onChangeLastame = (e) => {
    setErrors({
      ...errors,
      lastname: { isInvalid: false, msg: "" },
    });
    setLastname(e.target.value);
  };

  const onChangePhone = (e) => {
    setErrors({
      ...errors,
      phone: { isInvalid: false, msg: "" },
    });
    setPhone(e.target.value.toString());
  };

  const handleAdd = () => {
    if (name === "" && lastname === "" && phone === "") {
      setErrors({
        name: { isInvalid: true, msg: "Introduzca el nombre" },
        lastname: { isInvalid: true, msg: "Introduzca el apellido" },
        phone: { isInvalid: true, msg: "Introduzca el teléfono" },
      });
    } else if (name === "") {
      setErrors({
        ...errors,
        name: { isInvalid: true, msg: "Introduzca el nombre" },
      });
    } else if (lastname === "") {
      setErrors({
        ...errors,
        lastname: { isInvalid: true, msg: "Introduzca el apellido" },
      });
    } else if (phone === "") {
      setErrors({
        ...errors,
        phone: { isInvalid: true, msg: "Introduzca el teléfono" },
      });
    }
    if (name !== "" && lastname !== "" && phone !== "") {
      const contacts = [...phoneBookList];
      contacts.push({ id: phoneBookList.length, name, lastname, phone });
      setPhoneBookList(contacts);
      setName("");
      setLastname("");
      setPhone("");
    }
  };

  return (
    <Box
      sx={{
        padding: "30px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Phone Book 📱📒
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "30px" }}>
        <Card
          sx={{
            maxWidth: 345,
            backgroundColor: "whitesmoke",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
          }}
        >
          <Box sx={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="spam" gutterBottom sx={{ fontWeight: "500" }}>
              Nuevo contacto
            </Typography>
            <TextField
              error={errors.name.isInvalid}
              fullWidth
              id="standard-basic"
              label="Nombre"
              variant="standard"
              value={name}
              helperText={errors.name.msg}
              onChange={onChangeName}
            />
            <TextField
              error={errors.lastname.isInvalid}
              fullWidth
              id="standard-basic"
              label="Apellido"
              variant="standard"
              value={lastname}
              helperText={errors.lastname.msg}
              onChange={onChangeLastame}
            />
            <TextField
              error={errors.phone.isInvalid}
              sx={{ marginBottom: "16px" }}
              fullWidth
              id="standard-basic"
              label="Teléfono"
              variant="standard"
              value={phone}
              type="number"
              helperText={errors.phone.msg}
              onChange={onChangePhone}
            />
            <Button fullWidth variant="contained" onClick={handleAdd}>
              Agregar
            </Button>
          </Box>

          <CardActions
            disableSpacing
            onClick={handleExpandClick}
            sx={{ padding: "0 16px", cursor: "pointer" }}
          >
            <Typography variant="spam" gutterBottom sx={{ fontWeight: "500" }}>
              Ver contactos
            </Typography>
            <ExpandMore
              expand={expanded}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <TextField
                sx={{
                  marginBottom: "16px",
                  marginTop: 0,
                }}
                fullWidth
                id="standard-basic"
                label="Buscar"
                variant="outlined"
                size="small"
                value={search}
                onChange={onChangeSearch}
              />
              {
                <>
                  {search !== "" ? (
                    <>
                      {phoneBookListFilter.map((i) => (
                        <CardHeader
                          key={i.id}
                          sx={{ padding: 0, mb: 2 }}
                          avatar={
                            <Avatar
                              sx={{ bgcolor: red[500] }}
                              aria-label="recipe"
                            >
                              {i.name?.charAt(0)}
                            </Avatar>
                          }
                          title={`${i.name} ${i.lastname}`}
                          subheader={i.phone}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {phoneBookList.map((i) => (
                        <CardHeader
                          key={i.id}
                          sx={{ padding: 0, mb: 2 }}
                          avatar={
                            <Avatar
                              sx={{ bgcolor: red[500] }}
                              aria-label="recipe"
                            >
                              {i.name?.charAt(0)}
                            </Avatar>
                          }
                          title={`${i.name} ${i.lastname}`}
                          subheader={i.phone}
                        />
                      ))}
                    </>
                  )}
                </>
              }
            </CardContent>
          </Collapse>
        </Card>
      </Box>
    </Box>
  );
}
