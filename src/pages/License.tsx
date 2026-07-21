import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { routeByPath } from "../data/routes";

const MIT = `MIT License

Copyright (c) Muhammad Rabiul

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export default function License() {
  return (
    <DocPage page={routeByPath("/docs/license")!}>
      <h1>License</h1>
      <p className="lead">
        Toaster Magic is free and open-source software released under the MIT License.
      </p>

      <H2 id="mit">MIT License</H2>
      <p>
        You're free to use it in personal and commercial projects, modify it, and redistribute it.
        The only requirement is to keep the copyright and license notice.
      </p>
      <CodeBlock code={MIT} language="text" filename="LICENSE" />

      <H2 id="author">Author</H2>
      <p>
        Created and maintained by{" "}
        <a href="https://github.com/devrabiul" target="_blank" rel="noreferrer">
          Muhammad Rabiul
        </a>
        . If Toaster Magic is useful to you, consider{" "}
        <a href="https://github.com/sponsors/devrabiul" target="_blank" rel="noreferrer">
          sponsoring
        </a>{" "}
        or starring the repository.
      </p>
    </DocPage>
  );
}
