<Box>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="tabs">
                            <Tab label={
                                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <Box fontSize={"1.5rem"}>
                                        <TbUserSearch />

                                    </Box>

                                    <Typography variant="subtitle1" sx={{ textTransform: "none" }}>
                                        Nome Pessoal
                                    </Typography>
                                </Box>} {...a11yProps(0)} />
                            <Tab label={
                                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <Box fontSize={"1.5rem"}>
                                        <HiOutlineBuildingOffice2 />
                                    </Box>

                                    <Typography variant="subtitle1" sx={{ textTransform: "none" }}>
                                        Nome Coorporativo
                                    </Typography>
                                </Box>} {...a11yProps(1)} />
                            <Tab label={
                                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <Box fontSize={"1.5rem"}>
                                        <GiSpookyHouse />
                                    </Box>
                                    <Typography variant="subtitle1" sx={{ textTransform: "none" }}>
                                        Nome Geográfico
                                    </Typography>
                                </Box>} {...a11yProps(2)} />
                            <Tab label={
                                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <Box fontSize={"1.5rem"}>
                                        <MdSubject />
                                    </Box>
                                    <Typography variant="subtitle1" sx={{ textTransform: "none" }}>
                                        Termo Tópico
                                    </Typography>
                                </Box>} {...a11yProps(3)} />

                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Paper elevation={3} sx={{ p: "15px" }}>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                searchAuthority(search)
                                console.log("submit", type)}}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        // flexDirection: "column",
                                        gap: "8px",
                                    }}
                                >
                                    <FormControl sx={{width: "20rem"}} >
                                        <InputLabel id="demo-simple-select-label">
                                            Selecione uma opção
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={type}
                                            label="Selecione uma opção"
                                            onChange={handleChangeType}
                                        >
                                            <MenuItem value="all">Geral</MenuItem>
                                            <MenuItem value="authority">Nome Autorizado</MenuItem>
                                            <MenuItem value="fullerName">Nome completo</MenuItem>
                                            <MenuItem value="variant">Variantes</MenuItem>
                                            <MenuItem value="affliation">Afiliação</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="Busca"
                                        variant="outlined"
                                        value={search}
                                        fullWidth
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setSearch(e.target.value);
                                            // searchAuthority(e.target.value);
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="Search"
                                                        type="submit"
                                                    >
                                                        <FcSearch />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                            </form>
                        </Paper>
                    </CustomTabPanel>
                </Box>