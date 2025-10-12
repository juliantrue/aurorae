# Divinum Officium Integration Notes

## Installing the Perl runtime dependencies

The CGI scripts in `vendor/divinum-officium/web/cgi-bin` depend on modules that
are not bundled with the system Perl. Install them into `vendor/perl5` with the
following (run from the repository root):

```bash
mkdir -p vendor/perl5
PERL_MM_OPT="INSTALL_BASE=$PWD/vendor/perl5" \
PERL_MB_OPT="--install_base $PWD/vendor/perl5" \
PERL5LIB="$PWD/vendor/perl5/lib/perl5" \
cpan -T -i CGI
```

This pulls in `CGI`, `HTML::Parser`, and the supporting modules without writing
outside the repository.

## Populating the database and submodule

```bash
pnpm run liturgical:init   # ensures sparse checkout includes web/cgi-bin
pnpm run seed              # regenerates the SQLite database via the importer
```

## Comparing database content against Divinum Officium output

1. Ensure `vendor/perl5` is present (see above) so the CGI scripts can run.
2. Run the comparison harness:

   ```bash
   pnpm test:liturgy
   ```

   This executes `tests/divinum-officium/run-comparisons.ts`, which:
   - fetches the requested `Office` entries via Prisma,
   - renders the matching hora via the CGI script,
   - normalizes both outputs and reports any missing sections.

3. Add more fixtures by editing `tests/divinum-officium/cases.json`.

The comparison script defaults to the 1960 rubrics (`version=Rubrics 1960 - 1960`)
and currently focuses on the Matins readings/responsories that are surfaced in
that configuration.
