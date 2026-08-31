const fs = require('fs');
let code = fs.readFileSync('src/components/ContactSection.tsx', 'utf8');

// The marker we want to insert BEFORE:
const marker = '                <div className="sm:col-span-2">\n                  <Label htmlFor="interest"';

const cityDropdown = `                <div className="sm:col-span-2">
                  <Label htmlFor="city" className="font-medium text-foreground">City <span className="text-muted-foreground">(optional)</span></Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger id="city" className="mt-2 border-primary/20 bg-background text-foreground shadow-sm focus:ring-primary">
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Pune Region</SelectLabel>
                        <SelectItem value="Pune">Pune</SelectItem>
                        <SelectItem value="Pimpri-Chinchwad">Pimpri-Chinchwad</SelectItem>
                        <SelectItem value="Hinjewadi">Hinjewadi</SelectItem>
                        <SelectItem value="Ravet">Ravet</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Mumbai Region</SelectLabel>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Navi Mumbai">Navi Mumbai</SelectItem>
                        <SelectItem value="South Mumbai">South Mumbai</SelectItem>
                        <SelectItem value="Thane">Thane</SelectItem>
                        <SelectItem value="Kalyan">Kalyan</SelectItem>
                        <SelectItem value="Dombivali">Dombivali</SelectItem>
                        <SelectItem value="Andheri">Andheri</SelectItem>
                        <SelectItem value="Goregaon">Goregaon</SelectItem>
                        <SelectItem value="Malad">Malad</SelectItem>
                        <SelectItem value="Virar">Virar</SelectItem>
                        <SelectItem value="Palghar">Palghar</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Other Cities</SelectLabel>
                        <SelectItem value="Nashik">Nashik</SelectItem>
                        <SelectItem value="Kolhapur">Kolhapur</SelectItem>
                        <SelectItem value="Solapur">Solapur</SelectItem>
                        <SelectItem value="Nagpur">Nagpur</SelectItem>
                        <SelectItem value="Ahilyanagar">Ahilyanagar</SelectItem>
                        <SelectItem value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
`;

if (code.includes(marker)) {
  code = code.replace(marker, cityDropdown + marker);
  fs.writeFileSync('src/components/ContactSection.tsx', code);
  console.log('Successfully inserted City dropdown.');
} else {
  console.log('Error: Marker not found in file!');
}
